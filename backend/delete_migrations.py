from pathlib import Path

path = Path()

dot_py = path.rglob("apps/*/migrations/*.py")

for file in dot_py:
    if not file.name == "__init__.py":
        try:
            file.unlink()
        except OSError:
            print("Error while deleting file")

dot_pyc = path.rglob("apps/*/migrations/*.pyc")

for file in dot_pyc:
    try:
        file.unlink()
    except OSError:
        print("Error while deleting file")
