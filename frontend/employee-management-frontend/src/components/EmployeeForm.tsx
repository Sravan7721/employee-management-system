import { useEffect, useState } from "react";
import type { Employee } from "../types/employee";

interface Props {
    employee?: Employee | null;
    onSave: (employee: Employee, photo?: File) => void;
    onCancel: () => void;
}

const EmployeeForm = ({
    employee,
    onSave,
    onCancel,
}: Props) => {

    const [formData, setFormData] = useState<Employee>({
        id: undefined,
        name: "",
        email: "",
        department: "",
        salary: 0,
        photo: "",
        photoUrl: "",
    });

    const [photo, setPhoto] = useState<File>();

    useEffect(() => {

        if (employee) {
            setFormData(employee);
        }

    }, [employee]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                name === "salary"
                    ? Number(value)
                    : value,
        }));

    };

    const handlePhoto = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (e.target.files && e.target.files.length > 0) {
            setPhoto(e.target.files[0]);
        }

    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        onSave(formData, photo);

    };

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <div
                style={{
                    width: 450,
                    background: "#fff",
                    padding: 30,
                    borderRadius: 10,
                }}
            >

                <h2>
                    {employee ? "Edit Employee" : "Add Employee"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        style={{
                            width: "100%",
                            padding: 10,
                            marginBottom: 15,
                        }}
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        style={{
                            width: "100%",
                            padding: 10,
                            marginBottom: 15,
                        }}
                    />

                    <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Department"
                        required
                        style={{
                            width: "100%",
                            padding: 10,
                            marginBottom: 15,
                        }}
                    />

                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        required
                        style={{
                            width: "100%",
                            padding: 10,
                            marginBottom: 15,
                        }}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto}
                        style={{
                            marginBottom: 20,
                        }}
                    />

                    {/* Existing Photo */}
                    {!photo && formData.photoUrl && (
                        <img
                            src={formData.photoUrl}
                            alt="Employee"
                            width={120}
                            height={120}
                            style={{
                                display: "block",
                                marginBottom: 20,
                                borderRadius: 10,
                                objectFit: "cover",
                            }}
                        />
                    )}

                    {/* New Selected Photo Preview */}
                    {photo && (
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="Preview"
                            width={120}
                            height={120}
                            style={{
                                display: "block",
                                marginBottom: 20,
                                borderRadius: 10,
                                objectFit: "cover",
                            }}
                        />
                    )}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >

                        <button type="submit">
                            {employee ? "Update" : "Save"}
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EmployeeForm;