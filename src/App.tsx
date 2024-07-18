import { MoveDiagonalIcon } from "lucide-react"
import { images } from "./data"
import useImageModal from "./useImageModal"


function App() {
  const { onOpen } = useImageModal()
  return (
    <main className='grid grid-cols-5 justify-center content-center gap-2 max-w-7xl h-full mx-auto px-4'>
      {
        images.map((image, idx) => (
          <article key={image} onClick={()=> onOpen(idx)} className="relative group cursor-pointer overflow-hidden">
            <img src={image} className="w-full transition-transform group-hover:scale-150 ease-linear h-full object-cover object-center" />
            <div className="absolute transition-colors group-hover:bg-black/40 w-full h-full top-0 left-0 bg-transparent flex justify-center items-center">
              <MoveDiagonalIcon className="scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </article>
        ))
      }
    </main>
  )
}

export default App