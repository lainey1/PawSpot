function SpotHeader({ spot }) {
  return (
    <div>
      <h2 className="title">{spot?.name}</h2>
      <p className="location">
        {spot?.city}, {spot?.state}, {spot?.country}
      </p>
    </div>
  );
}

export default SpotHeader;
