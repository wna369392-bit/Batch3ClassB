export default function Modal(props) {
    return (
        <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            zIndex: 1000,
        }}
        >
            <div
            style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            minWidth: "300px",
            minHeight: "500px",
            textAlign: "center",
            }}
            >
            {props.children}
            </div>
        </div>
    );
}