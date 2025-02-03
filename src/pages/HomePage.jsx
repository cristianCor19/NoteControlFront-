import WelcomeHome from "@/components/Home/WelcomeHome"
import ActivityStates from "@/components/Home/ActivityStates"

function HomePage (){
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-body/50 to-white">
      <WelcomeHome/>
      <ActivityStates/>
    </div>
  )
}

export default HomePage