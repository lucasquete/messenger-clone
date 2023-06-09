"use client"

import Modal from "@/app/components/Modal";
import Image from "next/image";

const ImageModal = ({ src, isOpen, onClose }) => {
    
    if (!src) {
        return null;
    }



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-80 h-80">
            <Image src={src} fill alt="image" className="object-cover"/>
        </div>
    </Modal>
  )
}

export default ImageModal