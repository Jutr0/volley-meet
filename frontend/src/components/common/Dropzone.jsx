import {useDropzone} from "react-dropzone";
import {cn} from "@/lib/utils";

const Dropzone = ({onDrop, multiple = false}) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.jpg', '.jpeg', '.png'],
        },
        multiple,
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "p-4 text-center border-2 border-dashed rounded-md shadow-md cursor-pointer transition-all duration-300",
                isDragActive ? 
                    "border-primary bg-gray-100" : 
                    "border-gray-400 bg-background"
            )}
        >
            <input {...getInputProps()} />
            <div>
                <h6 className="text-base font-medium text-gray-500">
                    {isDragActive ? 'Drop files here...' : 'Drag and drop files here or click to select'}
                </h6>
                <p className="text-sm text-gray-500 mt-1">
                    (Accepted files: .pdf, .jpg, .jpeg, .png)
                </p>
            </div>
        </div>
    );
};

export default Dropzone;