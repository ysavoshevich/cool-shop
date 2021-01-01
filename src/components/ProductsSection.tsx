import React, { ReactElement } from 'react'
import ProductPreview from './ProductPreview'

export default function ProductsSection({ products }): ReactElement {
  return (
    <div>
      {products.map((product) => (
        <ProductPreview product={product} key={product.node.handle} />
      ))}
    </div>
  )
}
