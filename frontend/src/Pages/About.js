import { Button } from "primereact/button"

const About = () => {

  return (
    <div className="justify-content-center align-items-center" id="applicationPage">
      <div className="flex flex-column card smoothBorder text-center p-2" style={{ minWidth: "240px", gap: "8px" }}>
        <p className="">Login with Username:<span className="text-primary font-italic">"erva"</span> Password:<span className="text-primary font-italic">"password"</span> for Crud operations</p>
        <p className="">Details about the project can be found on Github</p>
        <br />
        <Button className="align-self-center" label="Github" icon="pi pi-github" onClick={() => window.open("https://github.com/ervaergul/bookstore-fullstack")} />
        <Button className="align-self-center" label="LinkedIn" icon="pi pi-linkedin" onClick={() => window.open("https://linkedin.com/in/ervaergul")} />
      </div>
    </div>
  )

}

export default About