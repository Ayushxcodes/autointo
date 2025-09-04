"use client";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

type Props = {
  onUpload: (e: string) => any;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();

  return (
    <div>
      <FileUploaderRegular
        pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!} // ✅ now works
        sourceList="local, camera, facebook, gdrive"
        classNameUploader="uc-light"
        onChange={async (output) => {
          if (output.successEntries.length > 0) {
            const cdnUrl = output.successEntries[0].cdnUrl;
            const file = await onUpload(cdnUrl);
            if (file) {
              router.refresh();
            }
          }
        }}
      />
    </div>
  );
};

export default UploadCareButton;
