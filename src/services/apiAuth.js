import supabase from "../services/supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updatedUser;
  if (password) updatedUser = { password };
  if (fullName)
    updatedUser = {
      data: {
        fullName: fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(updatedUser);
  if (error) {
    throw new Error(error.message);
  }

  //2. Upload the avatar image

  if (!avatar) return;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: errorAvatar } = await supabase.storage
    .from("avatars") // 'avatars' bucket'ına yükle
    .upload(fileName, avatar); // Dosyayı yükle

  if (errorAvatar) {
    console.log(errorAvatar);
    throw new Error(errorAvatar.message);
  }
  //3. Update avatar in the user
  const { data: data2, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://aoyjsdiimqmcvhsoexho.supabase.co/storage/v1/object/public/avatars//${fileName}`,
    },
  });
  if (error2) {
    throw new Error(error2.message);
  }

  return data2;
}
