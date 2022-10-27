const getStyles = () => ({
  title: {
    padding: '15px',
    marginBottom: '50px'
  }
})

const Title = () => {
  const styles = getStyles()

  return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
}

export default Title
