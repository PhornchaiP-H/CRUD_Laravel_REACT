<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\Log;



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::select('id', 'title', 'description', 'image')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image',
        ]);

        try {
            $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('product/image', $request->image, $imageName);
            Product::create($request->post() + ['image' => $imageName]);

            return response()->json([
                'message' => 'Product created successfully!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a Product!'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
        return response()->json([
            'product'=>$product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
        $request->validate([
            'title'=> 'required',
            'description'=> 'required',
            'image'=> 'nullable',
        ]);

        try{

            $product->fill($request->post())->update();
            
            if($request->hasFile('image')){
                // remove old image
                $exists = Storage::disk('public')->exists("public/image/{$product->image}");
                
                if($exists){
                    Storage::disk('public')->delete("product/image/{$product->image}");
                }

                $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/image', $request->file('image'), $imageName);
                $product->image = $imageName;
                
            }

            
            $product->save();

            return response()->json([
                'message' => 'Product Update Successfully!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while creating a Product!'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
        try{
            if ($product->image) {
                $exists = Storage::disk('public')->exists("public/image/{$product->image}");
                if ($exists) {
                    Storage::disk('public')->delete("public/image/{$product->image}");
                }
            }

            $product->delete();
        

            return response()->json([
                'message' => 'Product deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a Product!'
            ], 500);
        }
    }
}