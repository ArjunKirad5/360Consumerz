import { useEffect, useState , useRef} from "react";
import { useForm, Controller } from 'react-hook-form';
import html2canvas from 'html2canvas';


const Main = () => {

  const [UserData, setUserData] = useState([]); //stores all user data

  const [currentData, setCurrentData] = useState(null); //stores selected data when clicked on a user

  const profileCardRef = useRef(); //to select for snapshot

  const { control, handleSubmit, reset } = useForm(); //react hook controls

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")  //fetchs and stores user data
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.results);
      });
  }, []);

  console.log(UserData);

  const handleProfileClick = (user) => {  //after selecting user set the orignal data in profile card
    setCurrentData(user);
    reset({
      name: `${user.name.first} ${user.name.last}`,
      email: user.email || '',
      cell: user.cell || '',
      city: user.location.city || ''
    });
  };

  const handleDownload = () => {  //to take snapshot and download image
    if (profileCardRef.current) {
      html2canvas(profileCardRef.current).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'profile-card.png';
        link.click();
      });
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  const handleReset = () => {  //reset the form data after taking snapshot.
    reset({
      name: `${currentData.name.first} ${currentData.name.last}`,
      email: currentData.email || '',
      cell: currentData.cell || '',
      city: currentData.location.city || ''
    });
  };


  return (
    <>
      <div className="bg-blue-300">
        <h2 className="text-center pt-10 text-4xl font-bold">
          Corporate Profile Card Generator
        </h2>
        <div className="mx-auto mt-20 w-[85%] bg-amber-300 rounded-2xl">
          <ul className="py-4">
            {UserData.map((user,index) => { //render list of all user data
              return (
                <li
                  key={index}
                  className="cursor-pointer mx-auto bg-gray-100 rounded-3xl p-3 my-2 w-[30%] text-center text-md" //single list displaying user data
                  onClick={() => handleProfileClick(user)}
                >
                  <img
                    className="mx-auto my-2 rounded-lg w-[150px]"
                    src={user.picture.medium}
                  ></img>

                  <span className="text-lg font-medium my-2">Name : </span>
                  {`${user.name.first} ${user.name.last} `}
                  <br />

                  <span className="text-lg font-medium my-2">Email id : </span>
                  {user.email}<br />

                  <span className="text-lg font-medium my-2">Phone Number : </span>
                  {user.cell}<br />

                  <span className="text-lg font-medium my-2">Location : </span>
                  {user.location.city}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {currentData && ( //once clicked the form is opened
        <div className="mx-auto w-[60%] my-4 bg-amber-200 rounded-2xl p-4 absolute top-10 left-[0%] right-0" ref={profileCardRef}>
          <h2 className="text-center py-2 text-3xl font-bold">Profile Card</h2>
          <div className="flex justify-center">
            <img
              src={currentData.picture.large}
              alt="Profile"
              className="w-[200px] rounded-md"
            />
          </div>

          <form className="text-lg font-medium py-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[60%] mx-auto my-2 flex justify-center">
              <label className="w-[20%] text-2xl p-2 text-left">Name :</label> 
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-[50%] text-2xl p-2 bg-neutral-100 rounded-sm"
                  />
                )}
              />
            </div>

            <div className="w-[60%] mx-auto my-2 flex justify-center">
              <label className="w-[20%] text-2xl p-2 text-left">Email :</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-[50%] text-2xl p-2 bg-neutral-100 rounded-sm"
                  />
                )}
              />
            </div>

            <div className="w-[60%] mx-auto my-2 flex justify-center">
              <label className="w-[20%] text-2xl p-2 text-left">Cell :</label>
              <Controller
                name="cell"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-[50%] text-2xl p-2 bg-neutral-100 rounded-sm"
                  />
                )}
              />
            </div>

            <div className="w-[60%] mx-auto my-2 flex justify-center flex-wrap">
              <label className="w-[20%] text-2xl p-2 text-left">City :</label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-[50%] text-2xl p-2 bg-neutral-100 rounded-sm"
                  />
                )}
              />
            </div>

            <div className="w-[60%] flex flex-wrap justify-evenly mx-auto mt-7">
              <button className="px-3 py-2 border-0 rounded-xl bg-neutral-500 text-white cursor-pointer my-2" type="submit">Save Changes</button>
              <button className="px-3 py-2 border-0 rounded-xl bg-neutral-500 text-white cursor-pointer my-2" type="button" onClick={handleReset}>Reset</button>
              <button className="px-3 py-2 border-0 rounded-xl bg-neutral-500 text-white cursor-pointer my-2" type="button" onClick={handleDownload}>Download as Image</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Main;
