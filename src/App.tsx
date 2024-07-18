import { MoveDiagonalIcon } from "lucide-react"
import { images } from "./data"
import useImageModal from "./useImageModal"


function App() {
  const { onOpen } = useImageModal()
  return (
    <main className='mx-auto grid max-w-7xl grid-cols-2 content-center justify-center gap-2 p-4 sm:grid-cols-3 sm:px-4 md:h-screen md:grid-cols-4 lg:grid-cols-5'>
      {
        images.map((image, idx) => (
          <article key={image} onClick={()=> onOpen(idx)} className="group relative cursor-pointer overflow-hidden">
            <img src={image} className="h-full w-full object-cover object-center transition-transform ease-linear group-hover:scale-150" />
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-transparent transition-colors group-hover:bg-black/40">
              <MoveDiagonalIcon className="scale-0 transition-transform group-hover:scale-100" />
            </div>
          </article>
        ))
      }
    </main>
  )
}

export default App