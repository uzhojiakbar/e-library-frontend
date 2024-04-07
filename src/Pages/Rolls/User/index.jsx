import React from 'react'
import { CardText, ProductCard, ProductPage } from '../../Home/style'
import { NavLink } from 'react-router-dom'

const User = ({ books = [] }) => {
    return (
        <ProductPage>
            {books.map((v) =>
                !v.hidden && (
                    <ProductCard
                        url={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${v.pics[0].slice(
                            5
                        )}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
                        key={v.id}
                    >
                        <NavLink to={`/book/${v.id}`}>
                            <div className="img"></div>
                        </NavLink>
                        <CardText>
                            <h2>{v.name}</h2>
                            <p>{v.desc}</p>
                        </CardText>
                    </ProductCard>
                )
            )}
        </ProductPage>
    )
}

export default User