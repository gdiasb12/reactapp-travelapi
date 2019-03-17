import React from 'react';

const List = (props) => {
    const error = props.error;
    const isLoading = props.isLoading;
    const items = props.items;

  if (error) {
      return <div className="col mt-4 text-center">Error: {error}</div>;
  } else if (isLoading) {
      return <div className="col mt-4 text-center">Loading...</div>;
  } else if (items) {
      return (
        <div className="col mt-4">
        {
            items.map((item, index) => (
                <div className="card col-12 mt-4" key={index}>
                <div className="card-body col-12">
                    <h5 className="card-title"><strong>Code:</strong> {item.TicketInfo.Code}</h5>
                    <h5 className="card-title"><strong>Name:</strong> {item.TicketInfo.Name}</h5>
                    <p className="card-text">
                        <strong>Destination Code:</strong> {item.TicketInfo.Destination.Code}<br />
                        <strong>Classification:</strong> {item.TicketInfo.Classification.Code} - {item.TicketInfo.Classification.Value}
                    </p>
                </div> 
                <br/>
                <div className="card-body col-12 d-flex flex-wrap">
                {
                    item.TicketInfo.ImageList.map((image, index) => (
                        <div key={index}>    
                        {image.Type === 'S' &&
                        <img src={image.Url} className='rounded mb-2 mr-2' alt={image.Description} />
                    }
                    </div>
                    ))
                }
                </div>  
                </div>
                ))
        }
        </div>
        );
    } else {
        return <div>No results.</div>;
    }
}



export default List;
