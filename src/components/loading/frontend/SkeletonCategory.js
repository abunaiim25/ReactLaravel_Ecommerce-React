import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "./SkeletonViewProduct/SkeletonViewProduct.css"

const SkeletonCategory = () => {
  return (
    <>
      <div className="card-skeleton">
        <div className="">
          <Skeleton className='txt'/>
        </div>
      </div>
    </>
  )
}

export default SkeletonCategory
