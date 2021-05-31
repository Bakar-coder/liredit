import { FileUpload } from "../context";
import { randStr } from "./randomStringGenerator";

export const filePaths = ["static/images", "static/videos", "static/docs"];
export const paths = async (file: FileUpload): Promise<string | null> => {
  const { mimetype, filename } = await file;
  const [fileType] = mimetype.split("/");

  const mediaPath =
    fileType === "image"
      ? `static/images/${randStr}_${filename}`
      : fileType === "video"
      ? `static/videos/${randStr}_${filename}`
      : fileType === "application"
      ? `static/${randStr}_${filename}`
      : null;

  return new Promise((resolve) =>
    mediaPath ? resolve(mediaPath) : resolve(null)
  );
};
