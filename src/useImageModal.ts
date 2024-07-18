import { create } from "zustand"

interface ImageModalStore {
    open: boolean,
    imageIndex: number | null,
    onOpen: (image: number) => void,
    onClose: () => void
}

const useImageModal = create<ImageModalStore>((set) => ({
    open: false,
    imageIndex: null,
    onOpen(imageIndex) {
        set({ imageIndex, open: true })
    },
    onClose() {
        set({ imageIndex: null, open: false })
    },
}))

export default useImageModal