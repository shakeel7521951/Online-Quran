import React from 'react'
import TutorsHeader from './tutorsPage/TutorsHeader'
import TutorCards from './tutorsPage/TutorsCards'
import TutorTable from './tutorsPage/TutorsTable'

function TutorsPage() {
  return (
    <div>
      <TutorsHeader />
      <TutorCards />
      <TutorTable />
    </div>
  )
}

export default TutorsPage