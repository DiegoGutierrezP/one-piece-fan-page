import { FC } from 'react';
import { CharacterPicture } from '@/interfaces'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from '../../styles/CharacterPicturesSlide.module.css'

interface Props {
    pictures : CharacterPicture[];
}

export const CharacterPictureSlide:FC<Props> = ({pictures}) => {
  return (
    <>
        <Slide
            easing='ease'
            duration={7000}
            indicators
        >
            {
                pictures.map((pic, idx) => {
                    return (
                        <div className={styles['each-slide']} /* className={styles['each-slide']} */ key={idx} >
                            <div style={{
                                backgroundImage:`url(${pic.jpg.image_url})`,
                                backgroundSize:'cover'
                                }} >

                            </div>
                        </div>
                    )
                })
            }
        </Slide>
    </>
  )
}
