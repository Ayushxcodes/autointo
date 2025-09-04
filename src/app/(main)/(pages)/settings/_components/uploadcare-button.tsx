"use client";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

type Props = {
  onUpload: (cdnUrl: string) => any;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();

  return (
    <div>
      <FileUploaderRegular
        pubkey="a9428ff5ff90ae7a64eb"
        sourceList="local, camera, facebook, gdrive"
        classNameUploader="uc-light"
        onChange={async (output) => {
          // Uploaded files live in output.successEntries
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
