import { ChevronLeft, ChevronRight, XIcon } from "lucide-react"
import { images } from "./data"
import useImageModal from "./useImageModal"
import { useCallback, useEffect } from "react"

const ImageModal = () => {
    const { open, imageIndex: openedImage, onOpen, onClose } = useImageModal()
    const handleNext = useCallback(() => {
        if (openedImage === (images.length - 1)) {
            return
        }

        onOpen(openedImage! + 1)
    }, [onOpen, openedImage])

    const handlePrev = useCallback(() => {
        if (openedImage === 0) {
            return
        }
        onOpen(openedImage! - 1)
    }, [onOpen, openedImage])

    useEffect(() => {
        const handleKeyNavigation = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                handlePrev()
            } else if (e.key === 'ArrowRight') {
                handleNext()
            } else if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyNavigation)

        return () => {
            document.removeEventListener('keydown', handleKeyNavigation)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedImage])
    return (
        <div id="image-modal" className={`absolute inset-0 w-full h-full bg-black/70 justify-center items-center ${open ? 'flex' : 'hidden'}`}>
            <button type="button" className="bg-transparent absolute top-8 right-8" onClick={() => onClose()}>
                <XIcon className="scale-150 text-white/60 hover:text-white transition-colors" />
            </button>

            <div className="px-3 pb-3 space-y-2 flex flex-col justify-between h-full">
                <div />
                <div className="max-w-3xl">
                    <img src={images[openedImage!]} className="w-full rounded" />
                </div>

                <button disabled={openedImage === 0} onClick={() => onOpen(openedImage! - 1)} type="button" className="absolute transition-colors text-white/50 hover:text-white disabled:text-transparent left-5 top-[50%] translate-y-[-50%]">
                    <ChevronLeft className="scale-150" />
                </button>

                <button disabled={openedImage === (images.length - 1)} onClick={() => onOpen(openedImage! + 1)} type="button" className="absolute transition-colors text-white/50 hover:text-white disabled:text-transparent right-5 top-[50%] translate-y-[-50%]">
                    <ChevronRight className="scale-150" />
                </button>

                <div className="flex max-w-xl mx-auto scrollbar gap-2 flex-row overflow-x-auto">
                    {
                        images.map((image, idx) => (
                            <img src={image} key={idx} onClick={() => onOpen(idx)} className={`object-cover cursor-pointer object-center w-28 rounded-md ${idx === openedImage && 'border-2 opacity-50 '} `} draggable={false} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageModal