import React from 'react';
import {Link} from "@inertiajs/inertia-react";

export default function InvoiceSeriesItems({invoice}) {
    return (
        <>
            <table className="table mb-3 table-borderless border-bottom">
                <thead>
                <tr className="text-dark-50 border-bottom">
                    <th className="min-w-200px">Series</th>
                    <th className="min-w-80px text-right">Qty</th>
                    <th className="min-w-100px text-right">Price</th>
                </tr>
                </thead>
                <tbody>
                {
                    invoice.series_items.map((series) => (
                        <tr key={series.id} className="text-dark-75">
                            <td className="font-weight-bolder d-flex pt-6">
                                <i className="fa fa-genderless text-danger mr-2"/>
                                <Link href={route('series.show', series.slug)}
                                      className="text-dark-75 text-hover-primary">
                                    {series.title}
                                </Link>
                            </td>
                            <td className="pt-6 text-right">
                                1
                            </td>
                            <td className="pt-6 text-right">
                                {
                                    series.is_discount
                                        ? <span>Rp. {series.discount.discount_formatted},-</span>
                                        : <span>Rp. {series.price.price_formatted},-</span>

                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}
