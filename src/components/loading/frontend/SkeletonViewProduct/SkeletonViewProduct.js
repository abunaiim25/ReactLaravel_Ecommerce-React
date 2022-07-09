import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "./SkeletonViewProduct.css"

const SkeletonViewProduct = () => {
  return (
    <>
      <div className="card-skeleton">
        <div className="">
          <Skeleton className='img'/>
        </div>
        <div className="">
          <Skeleton className='txt'/>
        </div>
      </div>
    </>
  )
}

export default SkeletonViewProduct


/*
      <div className="card-skeleton">
        <div className="left-col">
          <Skeleton circle width={40} height={40} />
        </div>
        <div className="right-col">
          <Skeleton />
        </div>
      </div>
*/