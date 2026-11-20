import Container from './Container.jsx'
import DepartmentCard from './DepartmentCard.jsx'
import SectionHeading from './SectionHeading.jsx'
import { departments } from '../data/departments.js'

export default function DepartmentSection() {
  return (
    <section id="departments" aria-labelledby="departments-title" className="scroll-mt-48 bg-white py-section">
      <Container>
        <SectionHeading
          id="departments-title"
          title="Explore Our Departments"
          description="From fresh everyday essentials to authentic flavours from around the world."
          centered
        />
        <ul className="mt-8 grid auto-rows-fr grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {departments.map((department) => (
            <li key={department.path} className="min-w-0">
              <DepartmentCard department={department} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
