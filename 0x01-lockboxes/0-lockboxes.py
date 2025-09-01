def canUnlockAll(boxes):
    """
    Determines if all boxes can be opened.
    
    Args:
        boxes: A list of lists where each
        sublist contains keys to other boxes
        
    Returns:
        True if all boxes can be opened, False otherwise
    """
    n = len(boxes)
    if n == 0:
        return True
    
    # Track which boxes we can open
    opened = [False] * n
    opened[0] = True  # First box is always unlocked
    
    # Use a stack/queue to process boxes we can access
    keys_to_check = [0]  # Start with box 0
    
    while keys_to_check:
        current_box = keys_to_check.pop()
        
        # Process all keys in the current box
        for key in boxes[current_box]:
            # Only consider valid box numbers and boxes we haven't opened yet
            if 0 <= key < n and not opened[key]:
                opened[key] = True
                keys_to_check.append(key)
    
    # Check if all boxes were opened
    return all(opened)
