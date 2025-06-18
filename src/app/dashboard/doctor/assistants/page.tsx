import AddAssistantForm from "@/components/Doctors/AddAssistantForm";



export default function AssistantsPage() {
  // Add your logic here if needed
  const handleAdded = () => {
    console.log('Assistant added');
  };

  return (

    <AddAssistantForm onAdded={handleAdded} />

  );
}
