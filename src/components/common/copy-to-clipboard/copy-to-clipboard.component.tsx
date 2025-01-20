import React from "react";
import { CopyToClipboard as CopyToClipboardReact } from "react-copy-to-clipboard";

import useToast from "@src/hooks/utils/use-toast.hook";
import { t } from "i18next";

interface Props {
  activator: React.ReactNode;
  content: string;
  successMessage?: string;
}

const CopyToClipboard: React.FC<Props> = ({ activator, content, successMessage = t("success.copiedToClipboard") }) => {
  const { showToast } = useToast({ variant: "success" });

  return (
    <CopyToClipboardReact text={content} onCopy={() => showToast(successMessage)}>
      {activator}
    </CopyToClipboardReact>
  );
};

export default CopyToClipboard;
