function RegionPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const currentRegion = regions.find((item) => transliterate(item.link).toLowerCase() === decodedTitle.toLowerCase());

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('selectedContainer');
    return saved !== null ? Number(saved) : null;
  });

  if (!currentRegion) {
    console.error(`Ошибка: регион "${decodedTitle}" не найден в базе`);
    return <p>Регион не найден</p>;
  }

  // Определяем список категорий
  const options = [
    'МНОГОДНЕВНЫЕ ТУРЫ',
    'ОДНОДНЕВНЫЕ ЭКСКУРСИИ',
    'АВТОРСКИЕ ТУРЫ',
    'ОТЕЛИ / АППАРТАМЕНТЫ',
    'ЧТО ПОСЕТИТЬ',
    'РЕГИОНАЛЬНЫЕ MICE ИВЕНТЫ',
  ];

  return (
    <>
      <div className={classes.back}>
        <CenterBlock>
          <WidthBlock>
            <Header />
            <div className={classes.container}>
              <img
                src={currentRegion.img[1]}
                alt={currentRegion.title}
                className={classes.backImg}
              />
              <Container1
                currentRegion={currentRegion}
                selected={selected}
                setSelected={setSelected}
                options={options} // Передаем options в Container1
              />
            </div>
            <div className={classes.containerData}>
              <Container2
                currentRegion={currentRegion}
                selected={selected}
                options={options} // Передаем options в Container2
                multiDayTours={multiDayTours}
                onerDayTours={onerDayTours}
                hotels={hotels}
                places={places}
                events={events}
              />
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default RegionPage;
