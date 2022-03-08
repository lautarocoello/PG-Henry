import React, { useState, useEffect } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const EditExcursion = () => {
  //get params info
  const navigate = useNavigate();
  const { editExcursion, getExcursionById, excursionByid } =
    useExcursionsContext();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const id = urlParams.get("id");
  const name = urlParams.get("name");

  const [input, setInput] = useState({
    name: "",
    Images: [],
    description: "",
    location: "",
    date: [],
    time: [],
    price: 0,
    extra: "",
    excursionType: "",
  });

  //array for selects
  const locations = ["Bariloche", "Tucuman", "La Plata", "Villa Gesel"];
  const price = [500, 1000, 1500, 2000, 2500];
  const type = ["Trekking", "Bus", "Lacustre"];
  

  useEffect(() => {
    getExcursionById(id);
  }, []);

  /// HANDLE CHECKBOX
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setInput((prevState) => {
        return {
          ...prevState,
          [e.target.name]: [...prevState[e.target.name], e.target.value],
        };
      });
    }
    if (!e.target.checked) {
      input[e.target.name].splice(input[e.target.name].indexOf(e.target.value), 1);
      setInput((prevState) => {
        return { ...prevState };
      });
    }
  };

  ///HANDLE DE IMAGENES, Hay un bug! cuando se copia pega el link de la imagen y se lo va borrando letra por letra
  function handleArray(e) {
    setInput({
      ...input,
      Images: input.Images.includes(e.target.value)
        ? [...input.Images]
        : [...input.Images, e.target.value],
    });
  }

  //Handle Change
  function handleOnChange(e) {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  ///SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    editExcursion(input, id);
    setInput({
      name: "",
      Images: [],
      description: "",
      location: "",
      date: [],
      time: [],
      price: 0,
      extra: "",
      excursionType: "",
    });

    swal("Excursión modificada exitosamente");
    setTimeout(() => navigate("/panelAdmin"), 3000);
  };

  return (
    <div className="grid place-content-center">
      <h1 className="xl:text-4xl text-5xl text-center text-black font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto mt-5">
        Panel De Edicion
      </h1>
      <h3 className="grid place-content-center font-bold text-2xl text-center pb-1">
        Estas editando la excursion : {name}
      </h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Name */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Nombre de la excursión
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega un nombre claro y fácil de entender
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="name"
                        name="name"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder={excursionByid?.name}
                        defaultValue={""}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Imagenes de muestra
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el link de las imagenes que quieras mostrar.
                    </label>
                    <div>
                      <div className="mt-1">
                        <div>
                          <input
                            onChange={(e) => handleArray(e)}
                            type="text"
                            id="Images"
                            name="Images"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="https://imagenDeMuestra1.jpg"
                          />

                          <input
                            onChange={(e) => handleArray(e)}
                            type="text"
                            id="Images"
                            name="Images"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="https://imagenDeMuestra2.jpg"
                          />

                          <input
                            onChange={(e) => handleArray(e)}
                            type="text"
                            id="Images"
                            name="Images"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="https://imagenDeMuestra3.jpg"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Agrega imagenes que sean del lugar donde vas a realizar la
                      excursión.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Descripción de la excursión
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega una descripción de tu excursión.
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder={excursionByid?.description}
                        defaultValue={""}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Detalla claramente las actividades a realizar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Ubicación de la excursión.
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el lugar donde se realizará tu excursión.
                    </label>
                    <div className="mt-1">
                      <select className="" name="location" onChange={(e) => handleOnChange(e)}>
                        <option value="">
                          Seleccione Ubicacion
                        </option>
                        {locations?.map((locat) => (
                          <option value={locat}>
                            {locat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Agregar referencias puede ser una buena opción.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Fecha de la excursión.
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega la fecha de salida de tu excursión.
                    </label>
                    <div className="mt-1">
                      <input
                        type={"checkbox"}
                        id="monday"
                        value={"Lunes"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="monday">Lunes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="tuesday"
                        value={"Martes"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="tuesday">Martes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="wednesday"
                        value={"Miercoles"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="wednesday">Miercoles</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="thursday"
                        value={"Jueves"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="thursday">Jueves</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="friday"
                        value={"Viernes"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="friday">Viernes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="saturday"
                        value={"Sabado"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="saturday">Sabado</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="sunday"
                        value={"Domingo"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="sunday">Domingo</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Horario de salida.
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el horario de salida de tu excursión.
                    </label>
                    <div className="mt-1">
                      <input
                        type={"checkbox"}
                        id="8"
                        value={"8"}
                        name="time"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="monday">08 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="10"
                        value={"10"}
                        name="time"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="tuesday">10 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="12"
                        value={"12"}
                        name="time"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="wednesday">12 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="14"
                        value={"14"}
                        name="time"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="thursday">14 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="16"
                        value={"16"}
                        name="time"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="friday">16 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="18"
                        value={"18"}
                        name="time"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="saturday">18 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="20"
                        value={"20"}
                        name="time"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="sunday">20 hs</label>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Tener en cuenta un margen de retraso por imprevistos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Precio de la excursión.
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el costo total de tu excursión.
                    </label>
                    <div className="mt-1">
                      <select name="price" onChange={(e) => handleOnChange(e)}>
                        <option value="">
                          Seleccione Precio
                        </option>
                        {price?.map((p) => (
                          <option value={p}>
                            $ {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Extra */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Información extra sobre la excursión.
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega toda la información necesaria para la excursión
                      como equipamento y duración de la misma.
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="extra"
                        name="extra"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder={excursionByid?.extra}
                        defaultValue={""}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Excursion Type */}
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Tipo de excursión ofrecida.
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el tipo de excursión.
                    </label>
                    <div className="mt-1">
                      <select name="excursionType" onChange={(e) => handleOnChange(e)}>
                        <option value="">
                          Seleccione Tipo de Excursion
                        </option>
                        {type?.map((t) => (
                          <option value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Boton */}
        <div className="px-4 py-3 bg-white text-right sm:px-6 grid place-content-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Registrar Excursion
          </button>
        </div>
      </form>
    </div>
  );
};
