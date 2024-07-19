import useImageModal from "./useImageModal"
import { MoveDiagonalIcon } from "lucide-react"
import { images } from "./data"
import { useEffect, useRef } from "react"


function App() {
  const { onOpen, open, imageIndex } = useImageModal()
  const id = useRef(-1)

  useEffect(() => {
    if (open) {
      // To remember the selected image before closing the slider
      const newIndex = imageIndex ?? id.current
      document.querySelector<HTMLButtonElement>(`#image-${newIndex}`)?.focus()
      id.current = newIndex
      return
    }

    const handleKeyNavigation = (e: KeyboardEvent) => {
      // Storing the grid columns of different screen width for up and down navigation
      let cols = 0
      if (window.innerWidth < 640) {
        cols = 2
      } else if (window.innerWidth < 768) {
        cols = 3
      }
      else if (window.innerWidth < 1024) {
        cols = 4
      }
      else {
        cols = 5
      }

      if (e.key === 'ArrowLeft') {
        const newId = id.current > 0 ? id.current - 1 : 0
        document.querySelector<HTMLButtonElement>(`#image-${newId}`)?.focus()
        id.current = newId
      } else if (e.key === 'ArrowRight') {
        const newId = id.current < images.length - 1 ? id.current + 1 : images.length - 1
        document.querySelector<HTMLButtonElement>(`#image-${newId}`)?.focus()
        id.current = newId
      } else if (e.key === 'ArrowUp') {
        const potentialId = id.current - cols
        const newId = potentialId > 0 ? potentialId : 0
        document.querySelector<HTMLButtonElement>(`#image-${newId}`)?.focus()
        id.current = newId
      }
      else if (e.key === 'ArrowDown') {
        const potentialId = id.current + cols
        const newId = potentialId < images.length - 1 ? potentialId : images.length - 1
        document.querySelector<HTMLButtonElement>(`#image-${newId}`)?.focus()
        id.current = newId
      }
      else if (e.key === 'Escape') {
        document.querySelector<HTMLButtonElement>(`#image-${id.current}`)?.blur()
        id.current = -1
      }
    }

    document.addEventListener('keydown', handleKeyNavigation)
    return () => {
      document.removeEventListener('keydown', handleKeyNavigation)
    }
  }, [open, imageIndex])

  return (
    <main className='mx-auto grid max-w-7xl grid-cols-2 content-center justify-center gap-2 p-4 sm:grid-cols-3 sm:px-4 md:h-screen md:grid-cols-4 lg:grid-cols-5'>
      {
        images.map((image, idx) => (
          <article key={image} className="group/container relative cursor-pointer overflow-hidden">
            <button id={`image-${idx}`} onClick={() => onOpen(idx)} className="group/button h-full w-full focus:ring-white focus:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-2">
              <img src={image} className="h-full w-full object-cover object-center transition-transform ease-linear group-hover/container:scale-150 group-focus/button:scale-150" />
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-transparent transition-colors group-hover/container:bg-black/40 group-focus/button:bg-black/40">
                <MoveDiagonalIcon
                  className="scale-0 transition-transform group-hover/container:scale-100 group-focus/button:scale-100" />
              </div>
            </button>
          </article>
        ))
      }
    </main>
  )
}

export default App