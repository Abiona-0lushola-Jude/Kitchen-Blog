import React, { useState } from 'react'
import { ref , uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import { Storage } from './Storage'

const TestingImage = () => {

    const [imageUrl , setImageUrl] = useState([])

    const imagePath = ref(Storage, 'images/')
    const handleSubmit = async ()=>{
        const IamgeRef = ref(Storage, `images/${imageUrl.name}`)
        const url  = await uploadBytes(IamgeRef, imageUrl)
        console.log(imageUrl, url)
        const toGetImage =  await listAll(imagePath)
        const image = await toGetImage.items.forEach(async (item)=>{
            const url = await getDownloadURL(item)
            console.log(url)
        })
    }

  return (
    <div>
      <input type='file' name='imageUrl' onChange={(event)=> setImageUrl(event.target.files[0])}/>
        <button onClick={handleSubmit}>Upload</button>
    </div>
  )
}

export default TestingImage
