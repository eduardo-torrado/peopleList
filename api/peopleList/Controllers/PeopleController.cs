using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace peopleList.Controllers
{
    [ApiController]
    [Route("peopleList")]
    public class PeopleController : ControllerBase
    {
        private static Person[] people = new[]
        {
            new Person{BornDate = "22/05/1976",Age = 45, Id = 1, Name = "Carlos Santamaría"},
            new Person{BornDate = "11/04/1990",Age = 31, Id = 2, Name = "Felipe Restrepo"},
            new Person{BornDate = "16/03/1991",Age = 30, Id = 3, Name = "Jose Monroy"},
            new Person{BornDate = "03/02/1992",Age = 29, Id = 4, Name = "Lucía Roldán"},
            new Person{BornDate = "12/01/1993",Age = 28, Id = 5, Name = "Camila Díaz"},
            new Person{BornDate = "25/02/1994",Age = 27, Id = 6, Name = "Catalina Fernández"},
            new Person{BornDate = "01/03/1995",Age = 26, Id = 7, Name = "María Quintero"},
            new Person{BornDate = "25/04/1996",Age = 25, Id = 8, Name = "Ines Márquez"},
            new Person{BornDate = "20/05/1997",Age = 24, Id = 9, Name = "David Lopez"},
            new Person{BornDate = "10/04/1998",Age = 23, Id = 10, Name = "Luis Albarrán"}
        };

        [EnableCors]
        [HttpGet]
        public Person[] Get()
        {
            return people;
        }
    }
}
