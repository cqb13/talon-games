import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function saveCrossword(
  data: string,
  size: "full" | "mini",
  saveToArchive: boolean,
) {
  const crosswordRef = doc(db, "games", "crossword");
  const docSnap = await getDoc(crosswordRef);
  if (docSnap.exists()) {
    if (size == "full") {
      await updateDoc(crosswordRef, {
        crosswordFull: data,
      });
    } else {
      await updateDoc(crosswordRef, {
        crosswordMini: data,
      });
    }
  }

  if (docSnap.exists() && saveToArchive) {
    if (size == "full") {
      await updateDoc(crosswordRef, {
        fullCrosswordArchive: arrayUnion(data),
      });
    } else {
      await updateDoc(crosswordRef, {
        miniCrosswordArchive: arrayUnion(data),
      });
    }
  }
}
