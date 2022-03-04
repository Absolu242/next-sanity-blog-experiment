
import ImageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import { client } from '../lib/sanity'

function urlFor (source) {
    return ImageUrlBuilder(client).image(source)
  }
  

export default function PostCard({ post }) {

    const {
        title = 'Missing title',
        name = 'Missing name',
        body=[],
        authorImage,
        coverImage,
        date
      } = post
    

  return (
     <Link   href={`/post/${post.slug}`}>
      <div className='home__blog--item'>
        
        <div className='info'>
          <p className='date'>{date}</p>

          <a>
            <h3>{title}</h3>
            <button className='btn '>Continue</button>
          </a>
        </div>
      </div>
    </Link>
  )
}