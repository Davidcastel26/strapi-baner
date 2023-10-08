import { useRef } from 'react';
import { useGlobalContext } from './Context'
import sublinks from './data'


export const Submenu = () => {
  
  const submenuContainer = useRef(null)
  const { pageId, setPageId } = useGlobalContext();
  const currentPage = sublinks.find((item) => item.pageId === pageId)
  
  const handleMouseLeave = (event) => {
    const submenu = submenuContainer.current;
    const {left, right, bottom} = submenu.getBoundingClientRect()
    const { clientX, clientY } = event;

    // console.log(result)
    // console.log(clientX, clientY)
    if(clientX < left -1 || clientX > right -1 || clientY > bottom -1){
      setPageId(null)
    }
  }

  return (
    <div 
      onMouseLeave={handleMouseLeave} 
      className={ currentPage?.pageId ? 'submenu show-submenu': 'submenu'} 
      ref={submenuContainer}
    >
      <h5>{currentPage?.page}</h5>
      <div className="submenu-links"
        style={{gridTemplateColumns: currentPage?.links.length > 3 ? '1fr 1fr' : '1fr'}}
      >
        {currentPage?.links?.map((link) => {
          const {id, url, label, icon} = link;
          return <a href={url} key={id}>
            {icon}
            {label}
          </a>
        })}
      </div>
    </div>
  )
}
