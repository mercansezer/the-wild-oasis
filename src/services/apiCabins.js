import supabase, { supabaseUrl } from "./supabase";
export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}



export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); //id colonu sil bizim parametre olarak verdiğimiz id colomnu sil.

  if (error) {
    throw new Error("Cabin could not be deleted");
  }
  console.log(error);

  return data;
}

export async function createEditCabin(newCabin, id) {


  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;


  //1. Create/Edit Cabin
  let query = supabase.from("cabins");

  //2. Create cabin
  if (!id) {
    await query.insert([{ ...newCabin, image: imagePath }]).select();
  }

  //3. Edit Cabin

  if (id) {
    await query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query;
  if (error) {
    throw new Error("Cabin could not be created");
  }

  //2. Upload Image. If cabin is successfully created then upload the image.
  if (imageName.includes("undefined")) return;
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete image. if there is an error about loading image then delete the cabin.

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }

  

  return data;
}
