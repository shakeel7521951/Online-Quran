import React from 'react'
import TutorsHeader from './tutorsPage/TutorsHeader'
import TutorCards from './tutorsPage/TutorsCards'
import TutorFilters from './tutorsPage/TutorFilters'

function TutorsPage() {
  return (
    <div>
      <TutorsHeader />
      <TutorCards />
      <TutorFilters />
    </div>
  )
}

export default TutorsPage