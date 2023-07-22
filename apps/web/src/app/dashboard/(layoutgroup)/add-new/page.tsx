
import { MultiUploader } from "@/components/AddNew/BaseDropzone";


export default function AddNew() {

  
  return (
    <div className="w-full">
      <div className="text-5xl font-bold text-black py-4">New Document</div>

      <MultiUploader  />
    </div>
  );
}
