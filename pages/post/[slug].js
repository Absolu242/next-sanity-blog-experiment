import groq from 'groq'
import {PortableText} from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import { useRouter } from 'next/router'

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}


const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit('max').auto('format')}
        />
      )
    }
  }
}



const Post = ({post}) => {

  
  console.log(post);

  const {
    title = 'Missing title',
    name = 'Missing name',
    body=[],
    authorImage,
    coverImage
  } = post

  
  return (
    <article>
      <h1>{title}</h1>
      <span> {authorImage && (
        <div>
          <img
            src={urlFor(authorImage)
              .width(50)
              .url()}
          />
        </div>
      )} By {name}</span>
       <div>
          <img
            src={urlFor(coverImage)
              .width(800)
              .url()}
          />
        </div>
     
      <PortableText
        value={body}
        components={ptComponents}
      />
    </article>
  )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "authorImage": author->image,
  'coverImage': mainImage,
  body
}`

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const post = await client.fetch(query, { slug })
  return {
    props: {
      post
    }
  }
}
export default Post