import {createClient} from 'next-sanity'
import imageURLBuilder from '@sanity/image-url'

export const client =createClient({
    projectId:'kirvlykp',
    dataset:'production',
    apiVersion:'2022-08-13',
    useCdn:false,
    // token:process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder=imageURLBuilder(client);
export const urlFor =(source)=>builder.image(source)