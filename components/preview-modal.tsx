"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from "./ui/modal";
import Gallery from "./gallery";
import Info from "./ui/info";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div
        className="p-2 grid w-full grid-cols-1 items-start gap-x-4 gap-y-6 
        sm:grid-cols-12 lg:gap-x-6"
      >
        {/* Gallery Section */}
        <div className="p-2 sm:col-span-5 lg:col-span-5 max-h-[65vh] overflow-hidden">
          <Gallery images={product.images} />
        </div>

        {/* Info Section */}
        <div className="sm:col-span-7 lg:col-span-7 max-h-[65vh] overflow-auto">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
