import React from 'react';
import { Card, CardHeader, CardBody, Button, Divider } from '@nextui-org/react';

// create server side props
export async function getServerSideProps({ query }) {
  // define variables from query
  let page = query.page ?? 1;
  let limit = 9;

  try {
    // fetch data
    let res = await fetch(`${process.env.API_URL}/api/items?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error('Failed to get items');
    }

    // get fetched data
    let data = await res.json();

    return {
      props: {
        items: data.items,
        currPage: Number(page),
        totalPages: Math.ceil(data.total / limit)
      }
    };
  } catch (e) {
    // display error when
    console.error('Error fetching items: ', e);

    return {
      props: {
        items: [],
        currPage: 1,
        totalPages: 0,
        error: 'Failed to get items'
      }
    };
  }
}

// create the content page
export default function App({ items, currPage, totalPages, e }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Item Cards</h1>
      {e && <p className="text-red-500">{e}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <h4 className="text-md font-bold">{item.name}</h4>
            </CardHeader>
            <Divider/>
            <CardBody>
              <p>{item.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button
          disabled={currPage <= 1}
          onClick={() => {
            if (currPage > 1) {
              window.location.href = `/?page=${currPage - 1}`;
            }
          }}
        >
          Previous
        </Button>
        <Button
          disabled={currPage >= totalPages}
          onClick={() => {
            if (currPage < totalPages) {
              window.location.href = `/?page=${currPage + 1}`;
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
