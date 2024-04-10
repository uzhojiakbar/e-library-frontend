import React from 'react'
import { CardText, ProductCard, ProductPage } from '../../Home/style'
import { Drawer, DrawerContent, DrawerTrigger } from "../../../components/ui/drawer";
import Book from '../../../components/Book';
const User = ({ books = [] }) => {
    return (
        <ProductPage>
            {books.map((v) =>
                !v.hidden && (
                    <Drawer  >
                        <DrawerTrigger asChild>
                            <ProductCard
                                url={`https://firebasestorage.googleapis.com/v0/b/ochiqkutubxona-d034a.appspot.com/o/pics%2F${v.pics[0].slice(
                                    5
                                )}?alt=media&token=27b56b0f-821a-45ae-9ccb-f282a53987fd`}
                                key={v.id}
                            >
                                <div className="img"></div>
                                <CardText>
                                    <h2>{v.name}</h2>
                                    <p>{v.desc}</p>
                                </CardText>
                            </ProductCard>
                        </DrawerTrigger>
                        <DrawerContent className="pl-28" >
                            <Book id={v.id} books={books} />
                        </DrawerContent>
                    </Drawer>
                )
            )}
        </ProductPage>
    )
}

export default User