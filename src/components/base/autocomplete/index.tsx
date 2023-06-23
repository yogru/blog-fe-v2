import {useState} from 'react'
import {Combobox} from '@headlessui/react'
import {ViewItem} from "@/infra/generic-type";


const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

export default function MyCombobox() {
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <div className={"w-full flex flex-col"}>
                <div className={"w-full"}>
                    <Combobox.Input className={"w-full rounded h-12 border-2 p-4"}
                                    onChange={(event) => setQuery(event.target.value)}/>
                </div>

                <div>
                    <Combobox.Options className={"flex flex-col"}>
                        {filteredPeople.map((person) => (
                            <Combobox.Option key={person} value={person}>
                                {person}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </div>
            </div>
        </Combobox>
    )
}