
import { storage } from '../firebase/config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
export const uploadFile = async (fileName, file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, fileName);
    const uplaodTask = uploadBytesResumable(storageRef, file);
    let res;
    uplaodTask.on('state_changed', {
      complete: async () => {
        res = await getDownloadURL(uplaodTask.snapshot.ref);
        resolve(res);
      },
      error:(err)=>{
        reject(err)
      }
    })
  })
}
