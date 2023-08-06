<?php
namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'phone_number' => 'required|numeric',
            'longitude' => 'nullable|numeric',
            'latitude' => 'nullable|numeric',
            
        ]);

        $existingContact = Contact::where('phone_number', $request->phone_number)->first();

        if ($existingContact) {
            return response()->json([
                'message' => 'Contact with the same phone number already exists'
            ], 409);
        }
        if ($request->hasFile('pic_url')) {
            error_log(112); 
            $uploadedFile = $request->file('pic_url');
            $name = $uploadedFile->getClientOriginalName();
            $uploadedFile->move(public_path('images'), $name);
            $contact = Contact::create([
                'name' => $request->name,
                'phone_number' => $request->phone_number,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                "pic_url" => $name
            ]);
            
            return response()->json([
                'message' => 'Contact created successfully',
                'contact' => $contact,
            ], 201);
        }

        $contact = Contact::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            "pic_url" => "profile.png"
        ]);

        return response()->json([
            'message' => 'Contact created successfully',
            'contact' => $contact,
        ], 201);
    }

    public function show()
    {
        $contacts = Contact::all();

        return response()->json([
            'contacts' => $contacts,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

   

        $contact->update($request->all());

        return response()->json([
            'message' => 'Contact updated successfully',
            'contact' => $contact,
        ], 200);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json([
            'message' => 'Contact deleted successfully',
        ], 200);
    }
}
