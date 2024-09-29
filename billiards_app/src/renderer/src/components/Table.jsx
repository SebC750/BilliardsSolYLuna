const Table = ({tableNumber, tableColor}) =>{
       /*
       useEffect(() => {
              let interval
              if (timeStart) {
                  console.log(Math.floor((30/60) % 60))
                  setShowTimer(true)
                  setShowStartButton(false)
                  setShowEndButton(true)
                  var startDate = new Date()
                  var startSeconds = startDate.getSeconds()
                  var hourTo12 = startDate.getHours();
              if (startDate.getHours() > 12) {
                  hourTo12 = startDate.getHours() - 12;
              }
                  setStartDate(hourTo12.toString().padStart(2, '0') + ":" + startDate.getMinutes().toString().padStart(2, '0') + ":" + startDate.getSeconds().toString().padStart(2, '0') + "am")
                  interval = setInterval(() => {
      
                      var elapsed = new Date().getTime() - startDate.getTime()
                      var currentTime = (startSeconds + elapsed)*0.001
                      console.log(Math.round(currentTime))
                          setTime(Math.round(currentTime))
                          
                  },1000)
              }
              else if (!timeStart) {
      
                  clearInterval(interval);
      
      
      
              }
              return () => clearInterval(interval)
          }, [timeStart])
          */
       return (
        <>
        </>
       )
}
export default Table