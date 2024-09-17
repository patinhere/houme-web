import { Avatar } from "@readyplayerme/visage";
import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { useState } from "react";

const config = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none" };

export const AvatarDisplay = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleOnAvatarExported = (event) => {
    setAvatarUrl(event.data.url);
  };

  return (
    <>
      <AvatarCreator
        subdomain="https://houme.readyplayer.me?frameApi"
        config={config}
        style={style}
        onAvatarExported={handleOnAvatarExported}
      />
      {avatarUrl && <Avatar modelSrc={avatarUrl} />}
    </>
  );
};

export const AvatarImport = () => {
  const handleOnAvatarExported = (event) => {
    console.log(`Avatar URL is: ${event.data.url}`);
  };

  return (
    <>
      <AvatarCreator
        subdomain="https://houme.readyplayer.me?frameApi"
        config={config}
        style={style}
        onAvatarExported={handleOnAvatarExported}
      />
    </>
  );
};

export const AvatarUpload = async ({ photo }) => {
  const key = "sk_live_Wjfxn6YVYdHXoSKyUDMaI6n0Zf2q-feol3N1";
  const formData = new FormData();
  formData.append("photo", photo);

  try {
    const response = await fetch(
      "https://api.readyplayer.me/v1/temporary-media",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload photo");
    }

    const result = await response.json();
    console.log(result);
    //const modelUrl = result.url; // Adjust this line based on the actual API response structure
  } catch (error) {
    console.error("Error:", error);
  }
};
