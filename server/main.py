import asyncio

if __name__ == '__main__':
    from app_server import create_app
    app = create_app()
    app.run(debug=True, host='127.0.0.1')  # Generate Adhoc Certs